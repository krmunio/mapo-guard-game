$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$sourceDirectory = Join-Path $projectRoot "examples\completed"
$filesToRestore = @("index.html", "style.css", "script.js")

try {
    foreach ($fileName in $filesToRestore) {
        $sourcePath = Join-Path $sourceDirectory $fileName
        $destinationPath = Join-Path $projectRoot $fileName

        if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
            throw "초기화 원본 파일을 찾을 수 없습니다: $sourcePath"
        }

        Copy-Item -LiteralPath $sourcePath -Destination $destinationPath -Force
    }

    Write-Host "게임을 다음 참가자를 위한 시작 상태로 초기화했습니다." -ForegroundColor Green
}
catch {
    Write-Error "게임 초기화에 실패했습니다. $($_.Exception.Message)"
    exit 1
}
