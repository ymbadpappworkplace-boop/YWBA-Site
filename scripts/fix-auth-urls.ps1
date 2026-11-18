# One-off: point Supabase Auth at the deployed site.
#
# Why: when `redirectTo` is not in the redirect allowlist, Supabase replaces it
# with Site URL. The hosted app then lands on http://localhost:3000 and dies.
# `supabase config push` resets Site URL to that same default, so fix it here.
#
# This intentionally allows the production site only. If you want to test
# Google sign-in on localhost, add your dev URL (for example
# "http://localhost:8080/**") to -RedirectUrls for that session.
#
# Usage (PowerShell):
#   $env:SUPABASE_ACCESS_TOKEN = "sbp_..."   # https://supabase.com/dashboard/account/tokens
#   ./scripts/fix-auth-urls.ps1
#
# The token is a personal access token; never commit it.

param(
  [string]$ProjectRef  = "hfzcindiwpkgvsdhelhv",
  [string]$SiteUrl     = "https://ywbasite.vercel.app",
  [string]$RedirectUrls = "https://ywbasite.vercel.app/**"
)

$token = $env:SUPABASE_ACCESS_TOKEN
if ([string]::IsNullOrWhiteSpace($token)) {
  throw "Set SUPABASE_ACCESS_TOKEN first: `$env:SUPABASE_ACCESS_TOKEN = 'sbp_...' (https://supabase.com/dashboard/account/tokens)"
}

$headers = @{ Authorization = "Bearer $token" }
$endpoint = "https://api.supabase.com/v1/projects/$ProjectRef/config/auth"

Write-Host "`nBefore:" -ForegroundColor Cyan
Invoke-RestMethod $endpoint -Headers $headers |
  Select-Object site_url, uri_allow_list |
  Format-List

$body = @{ site_url = $SiteUrl; uri_allow_list = $RedirectUrls } | ConvertTo-Json
Invoke-RestMethod -Method Patch $endpoint -Headers $headers -ContentType "application/json" -Body $body | Out-Null

Write-Host "After:" -ForegroundColor Cyan
$after = Invoke-RestMethod $endpoint -Headers $headers
$after | Select-Object site_url, uri_allow_list | Format-List

if ($after.site_url -ne $SiteUrl) {
  throw "Site URL is still '$($after.site_url)' - the update did not persist."
}

if ($after.uri_allow_list -match 'localhost') {
  throw "The redirect allowlist still contains localhost: '$($after.uri_allow_list)'."
}

Write-Host "OK - OAuth will now return to $SiteUrl/auth" -ForegroundColor Green
