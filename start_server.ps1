$port = 8080
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "Server running at $prefix"

$root = 'C:\Users\User\.gemini\antigravity\scratch\prayer-letter-2026-08'

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq '/') { $urlPath = '/index.html' }
        
        $filePath = Join-Path $root ($urlPath.TrimStart('/').Replace('/', '\'))
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                '.html' { $response.ContentType = 'text/html; charset=utf-8' }
                '.css'  { $response.ContentType = 'text/css; charset=utf-8' }
                '.js'   { $response.ContentType = 'application/javascript; charset=utf-8' }
                '.jpg'  { $response.ContentType = 'image/jpeg' }
                '.jpeg' { $response.ContentType = 'image/jpeg' }
                '.png'  { $response.ContentType = 'image/png' }
                '.svg'  { $response.ContentType = 'image/svg+xml' }
                default { $response.ContentType = 'application/octet-stream' }
            }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        # continue loop
    }
}
