Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DEPLOYING CORRECTED BONUS SYSTEM" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan

cd C:\Users\Shawntel\edgecore-systems

# Add all files to git
git add .
git commit -m "Added bonus system: deposit bonuses and withdrawal fees"

# Deploy to Vercel
vercel --prod

Write-Host ""
Write-Host "✅ SYSTEM DEPLOYED!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 DEPOSIT BONUS (Added to balance):" -ForegroundColor Yellow
Write-Host "  • $10-$99 deposit → +$10 BONUS" -ForegroundColor Green
Write-Host "  • $100-$599 deposit → +$50 BONUS" -ForegroundColor Green
Write-Host "  • $500+ deposit → +$150 BONUS" -ForegroundColor Green
Write-Host ""
Write-Host "💰 WITHDRAWAL SERVICE FEE (Deducted):" -ForegroundColor Yellow
Write-Host "  • Under $100 → $5 fee" -ForegroundColor Green
Write-Host "  • $100-$499 → $10 fee" -ForegroundColor Green
Write-Host "  • $500+ → $50 fee" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 Deposit: https://edgecore-systems.vercel.app/wallet/deposit" -ForegroundColor Cyan
Write-Host "🔗 Withdraw: https://edgecore-systems.vercel.app/wallet/withdraw" -ForegroundColor Cyan
