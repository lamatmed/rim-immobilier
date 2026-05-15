export const getSuspendedHtml = () => {
  return `<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Suspendu / الخدمة معلقة</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #09090b;
            --card-bg: rgba(24, 24, 27, 0.65);
            --border-color: rgba(255, 255, 255, 0.08);
            --text-primary: #f4f4f5;
            --text-secondary: #a1a1aa;
            --accent-color: #ef4444;
            --accent-glow: rgba(239, 68, 68, 0.15);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', 'Tajawal', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            overflow: hidden;
            position: relative;
        }

        /* Subtle background effects */
        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.03) 0%, transparent 40%);
            z-index: -1;
        }

        .grid-overlay {
            position: absolute;
            inset: 0;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
            background-size: 30px 30px;
            mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%);
            -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%);
            z-index: -1;
        }

        .card {
            max-width: 600px;
            width: 100%;
            background-color: var(--card-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            padding: 2.5rem 2rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            text-align: center;
            animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        .icon-container {
            width: 72px;
            height: 72px;
            background-color: var(--accent-glow);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: var(--accent-color);
            box-shadow: 0 0 20px 0 var(--accent-glow);
            animation: pulse 3s infinite ease-in-out;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.9; box-shadow: 0 0 25px 4px var(--accent-glow); }
        }

        .section {
            margin-bottom: 2rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--border-color);
        }

        .section:last-of-type {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }

        .section.arabic {
            direction: rtl;
            font-family: 'Tajawal', sans-serif;
        }

        h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            letter-spacing: -0.02em;
        }

        .section.arabic h1 {
            font-size: 1.75rem;
            font-weight: 700;
        }

        p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.6;
        }

        .section.arabic p {
            font-size: 1.05rem;
            line-height: 1.7;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.05);
            padding: 0.5rem 1rem;
            border-radius: 99px;
            font-size: 0.8rem;
            font-weight: 500;
            color: var(--text-secondary);
            margin-top: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .badge::before {
            content: '';
            width: 6px;
            height: 6px;
            background-color: var(--accent-color);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--accent-color);
        }

        @media (max-width: 480px) {
            .card {
                padding: 2rem 1.25rem;
            }
            h1 {
                font-size: 1.35rem;
            }
            .section.arabic h1 {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="grid-overlay"></div>
    
    <div class="card">
        <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>

        <!-- English/French Section -->
        <div class="section">
            <h1>Service Suspendu</h1>
            <p>Cette application a été temporairement suspendue en raison d'un défaut de paiement. Veuillez contacter l'administrateur ou le développeur de l'application pour régulariser la situation et rétablir l'accès au service.</p>
        </div>

        <!-- Arabic Section -->
        <div class="section arabic">
            <h1>الخدمة معلقة</h1>
            <p>تم تعليق هذا التطبيق مؤقتًا بسبب عدم السداد. يرجى الاتصال بمسؤول النظام أو المطور لتسوية الوضع واستعادة إمكانية الوصول إلى الخدمة.</p>
        </div>

        <div class="badge">
            Code: 402 Payment Required
        </div>
    </div>
</body>
</html>`;
};
