<#
PowerShell script to compress PDF and MP4 assets locally.

Prerequisites (install on Windows):
- ffmpeg (https://ffmpeg.org/download.html) — add to PATH
- Ghostscript (gswin64c) (https://www.ghostscript.com/download/gsdnld.html) — add to PATH

Usage:
1) Install prerequisites and restart PowerShell.
2) Run this script from repo root (PowerShell):
   .\scripts\compress-assets.ps1

This script will:
- Create `tmp_compressed/` and `public/Assets/Projects` directories
- Compress each MP4 found in `src/Assets/Projects/` to a smaller CRF-driven MP4 in `tmp_compressed/`
- Compress the PDF to a smaller PDF in `tmp_compressed/`
- (Manual) After verifying the compressed files, copy them into `public/Assets/...` and update imports in the code.
#>

set -e
$RepoRoot = Resolve-Path "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)\.."
Push-Location $RepoRoot

$srcVidDir = "src/Assets/Projects"
$tmpDir = "tmp_compressed"
$publicProjDir = "public/Assets/Projects"
$srcPdf = "src/Assets/CV-Chedly Laadhiby (2).pdf"
$tmpPdf = Join-Path $tmpDir "CV-Chedly_Laadhiby_compressed.pdf"

if(!(Test-Path $tmpDir)){ New-Item -ItemType Directory -Path $tmpDir | Out-Null }
if(!(Test-Path $publicProjDir)){ New-Item -ItemType Directory -Path $publicProjDir -Force | Out-Null }

Write-Host "Starting compression..." -ForegroundColor Cyan

# Compress PDF using Ghostscript (quality screen/ebook/printer options)
if (Get-Command gswin64c -ErrorAction SilentlyContinue) {
    Write-Host "Compressing PDF with Ghostscript..."
    & gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile="$tmpPdf" "$srcPdf"
    Write-Host "PDF compressed to: $tmpPdf"
} else {
    Write-Warning "Ghostscript (gswin64c) not found. Skipping PDF compression. Install Ghostscript to enable this step." -ForegroundColor Yellow
}

# Compress videos using ffmpeg with H.264 (libx264) + medium CRF and 2-pass option for better quality/size
if (Get-Command ffmpeg -ErrorAction SilentlyContinue) {
    $vids = Get-ChildItem -Path $srcVidDir -Filter *.mp4 -File -ErrorAction SilentlyContinue
    foreach ($v in $vids) {
        $inFile = $v.FullName
        $outFile = Join-Path $tmpDir ($v.BaseName + "_compressed.mp4")
        Write-Host "Compressing $($v.Name) -> $outFile"
        # Use libx264, CRF 28 (adjust lower for better quality), preset veryfast for a balance
        & ffmpeg -y -i "$inFile" -c:v libx264 -preset veryfast -crf 28 -c:a aac -b:a 128k -movflags +faststart "$outFile"
        Write-Host "Created: $outFile"
    }
} else {
    Write-Warning "ffmpeg not found. Skipping video compression. Install ffmpeg to enable this step." -ForegroundColor Yellow
}

Write-Host "Compression script finished. Compressed outputs are in: $tmpDir" -ForegroundColor Green
Write-Host "Next steps (manual):" -ForegroundColor Cyan
Write-Host "1) Verify compressed files in $tmpDir." -ForegroundColor Cyan
Write-Host "2) If OK, copy compressed MP4s to public/Assets/Projects/ and compressed PDF to public/ (rename to CV-Chedly_Laadhiby.pdf)." -ForegroundColor Cyan
Write-Host "   Example:" -ForegroundColor Cyan
Write-Host "     Copy-Item $tmpDir\*compressed.mp4 -Destination $publicProjDir -Force" -ForegroundColor Yellow
Write-Host "     Copy-Item $tmpPdf -Destination public\CV-Chedly_Laadhiby.pdf -Force" -ForegroundColor Yellow
Write-Host "3) Update imports in code to reference public paths (e.g. '/Assets/Projects/Ekitab_Vid_compressed.mp4' and '/CV-Chedly_Laadhiby.pdf')." -ForegroundColor Cyan

Pop-Location
