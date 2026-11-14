<#
.SYNOPSIS
    Automated Analytical Validation Test Suite for ScamSense AI
#>

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  SCAMSENSE AI - MALAYSIAN HYBRID SCAM DETECTION TESTS    " -ForegroundColor Cyan
Write-Host "==========================================================`n" -ForegroundColor Cyan

# Define heuristic rules mirror matching rules.ts
$Rules = @(
    @{
        Id = "TAC_OTP"
        Category = "Credential Harvesting"
        Severity = "CRITICAL"
        Weight = 45
        Regex = "\b(tac\s*code|nombor\s*tac|no[\.\s]*tac|6[\s-]?digit\s*tac|otp\s*code|nombor\s*otp|verification\s*code|kod\s*pengesahan|kod\s*keselamatan)\b"
    },
    @{
        Id = "PASS_PIN"
        Category = "Credential Harvesting"
        Severity = "CRITICAL"
        Weight = 45
        Regex = "\b(kata\s*laluan|password|card\s*pin|nombor\s*pin|atm\s*pin|cvv|cvc)\b"
    },
    @{
        Id = "SAFE_ACCOUNT"
        Category = "Financial Trap"
        Severity = "CRITICAL"
        Weight = 50
        Regex = "\b(akaun\s*(selamat|sementara|perlindungan|keselamatan|holding|audit)|safe\s*account|safety\s*account|secure\s*vault|escrow\s*account|pindah(?:kan)?\s*wang\s*anda\s*ke\s*akaun|transfer\s*funds\s*to\s*safe\s*account)\b"
    },
    @{
        Id = "FEES"
        Category = "Financial Demand"
        Severity = "HIGH"
        Weight = 30
        Regex = "\b(yuran\s*(pemprosesan|pengaktifan|pelepasan|duti\s*setem|redelivery)|processing\s*fee|clearance\s*fee|release\s*fee|bayaran\s*pendahuluan|wang\s*jaminan|upfront\s*payment|caj\s*tambahan)\b"
    },
    @{
        Id = "URL_SUSPICIOUS"
        Category = "Deceptive Links"
        Severity = "HIGH"
        Weight = 30
        Regex = "(https?:\/\/(?:bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly|[^\s]+(?:\.top|\.xyz|\.click|\.support|\.online|-secure|-login|-verify|-update))[^\s]*)"
    },
    @{
        Id = "URGENCY"
        Category = "Psychological Coercion"
        Severity = "HIGH"
        Weight = 25
        Regex = "\b(tindakan\s*segera|segera|dalam\s*tempoh\s*(1|2|5|10|15|24|48)\s*jam|immediate|immediately|immediate\s*action|urgent|urgently|act\s*now|asap|within\s*(1|2|5|10|15|24|48)\s*hours?|expires?\s*soon|tamat\s*tempoh)\b"
    },
    @{
        Id = "THREAT"
        Category = "Psychological Coercion"
        Severity = "HIGH"
        Weight = 25
        Regex = "\b(akaun\s*(anda\s*)?(disekat|digantung|ditutup|dibekukan)|account\s*(will\s*be\s*)?(suspended|terminated|deactivated|frozen|locked)|tindakan\s*undang[\s-]?undang|waran\s*tangkap|arrest\s*warrant|mahkamah|disaman)\b"
    },
    @{
        Id = "PRIZE"
        Category = "Unexpected Rewards"
        Severity = "HIGH"
        Weight = 30
        Regex = "\b(tahniah|congratulations|cabutan\s*bertuah|lucky\s*draw|pemenang|hadiah\s*lumayan|bantuan\s*(kewangan|khas|e-dompet)|subsidi)\b"
    }
)

function Test-ScamSenseEngine([string]$text) {
    if ([string]::IsNullOrWhiteSpace($text)) {
        return @{ Score = 0; Category = "LOW"; Matches = @() }
    }

    $matched = @()
    $rawScore = 0
    $catsSeen = @{}
    $hasCritical = $false

    foreach ($r in $Rules) {
        if ($text -match $r.Regex) {
            $matched += $r
            if ($r.Severity -eq "CRITICAL") { $hasCritical = $true }

            $cat = $r.Category
            if (-not $catsSeen.ContainsKey($cat)) {
                $rawScore += $r.Weight
                $catsSeen[$cat] = 1
            } else {
                $rawScore += [int]($r.Weight * 0.35)
            }
        }
    }

    if ($catsSeen.Keys.Count -ge 3) {
        $rawScore = [int]($rawScore * 1.25)
    }
    if ($hasCritical -and $catsSeen.Keys.Count -ge 2) {
        if ($rawScore -lt 75) { $rawScore = 75 }
    }

    # Contextual mitigation: Bank security reminders that explain "never ask for TAC"
    $isProtective = $text -match "\b(tidak\s*akan\s*meminta|never\s*ask\s*for|jangan\s*kongsikan|never\s*share|peringatan\s*keselamatan)\b"
    if ($isProtective) {
        $rawScore = [Math]::Max(5, $rawScore - 40)
    }

    $finalScore = [Math]::Min(100, [Math]::Max(0, $rawScore))

    $category = "LOW"
    if ($finalScore -ge 70) {
        $category = "HIGH"
    } elseif ($finalScore -ge 30) {
        $category = "MEDIUM"
    }

    return @{
        Score = $finalScore
        Category = $category
        Matches = $matched
    }
}

$TestCases = @(
    @{
        Name = "Scenario 1: Maybank Urgent TAC Code Phishing (BM/Bilingual)"
        Text = '[MAYBANK ALERT]: Transaksi RM1,890.00 telah dikesan. Balas segera dengan nombor TAC 6-digit anda atau klik https://maybank-update.xyz/login untuk elak akaun disekat.'
        ExpectedCategory = "HIGH"
        MinScore = 70
    },
    @{
        Name = "Scenario 2: Pos Malaysia Redelivery Fee Phishing (BM)"
        Text = 'Pos Malaysia: Bungkusan anda tidak dapat dihantar. Sila bayar caj penghantaran semula RM2.50 di http://bit.ly/pos-redeliver dalam tempoh 24 jam.'
        ExpectedCategory = "MEDIUM"
        MinScore = 30
    },
    @{
        Name = "Scenario 3: LHDN Court Arrest Warrant Threat (BM)"
        Text = 'PERINGATAN LHDN: Tunggakan cukai RM3,420 dikesan. Waran tangkap Mahkamah telah dikeluarkan. Pindahkan wang kompaun ke akaun audit sementara segera.'
        ExpectedCategory = "HIGH"
        MinScore = 70
    },
    @{
        Name = "Scenario 4: Touch n Go eWallet Prize / Subsidy Phishing (BM)"
        Text = 'Tahniah! Nombor telefon anda memenangi Cabutan Bertuah TNG RM1,500. Layari https://tng-claim.online dan masukkan kata laluan anda.'
        ExpectedCategory = "HIGH"
        MinScore = 70
    },
    @{
        Name = "Scenario 5: CIMB Safe Account Diversion Scam (English)"
        Text = 'URGENT CIMB NOTICE: Unauthorized withdrawals detected. To safeguard funds, transfer remaining balance to our official safe account immediately.'
        ExpectedCategory = "HIGH"
        MinScore = 70
    },
    @{
        Name = "Scenario 6: Legitimate Maybank Transaction Notification with Anti-Fraud Reminder"
        Text = 'RM0.00 Maybank: RM150 debited on 14/11/26 at PETRONAS TTDI. Reminder: Maybank will NEVER ask for your password, PIN or 6-digit TAC code.'
        ExpectedCategory = "LOW"
        MaxScore = 29
    }
)

$Passed = 0
$Failed = 0

foreach ($test in $TestCases) {
    $res = Test-ScamSenseEngine -text $test.Text
    $pass = $true

    if ($res.Category -ne $test.ExpectedCategory) {
        $pass = $false
    }
    if ($test.MinScore -and $res.Score -lt $test.MinScore) {
        $pass = $false
    }
    if ($test.MaxScore -and $res.Score -gt $test.MaxScore) {
        $pass = $false
    }

    if ($pass) {
        Write-Host " [PASS] $($test.Name)" -ForegroundColor Green
        Write-Host "        Score: $($res.Score)/100 | Category: $($res.Category) | Matched Rules: $($res.Matches.Count)" -ForegroundColor Gray
        $Passed++
    } else {
        Write-Host " [FAIL] $($test.Name)" -ForegroundColor Red
        Write-Host "        Got Score: $($res.Score) ($($res.Category)), Expected Cat: $($test.ExpectedCategory) (Min: $($test.MinScore), Max: $($test.MaxScore))" -ForegroundColor Red
        $Failed++
    }
}

Write-Host "`nTest Suite Results: $Passed Passed, $Failed Failed" -ForegroundColor $(if ($Failed -eq 0) { "Green" } else { "Red" })
Write-Host "==========================================================" -ForegroundColor Cyan

if ($Failed -gt 0) { exit 1 } else { exit 0 }
