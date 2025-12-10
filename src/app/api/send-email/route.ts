import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    try {
        // Vérifier que la clé API est configurée
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Service email non configuré' },
                { status: 500 }
            );
        }

        // Initialiser Resend avec la clé API
        const resend = new Resend(apiKey);

        const { prenom, email } = await request.json();

        // Validation basique
        if (!prenom || !email) {
            return NextResponse.json(
                { error: 'Prénom et email sont requis' },
                { status: 400 }
            );
        }

        // Envoyer l'email
        const { data, error } = await resend.emails.send({
            from: 'Inno-Mation <onboarding@resend.dev>', // Utilisez votre domaine vérifié
            to: [email],
            subject: `🎯 ${prenom}, votre checklist "Gagnez 5h/semaine" est prête !`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
                        .header { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 30px; text-align: center; }
                        .header h1 { color: #111; margin: 0; font-size: 24px; }
                        .content { padding: 30px; background: #fff; }
                        .cta-button { display: inline-block; background: #fbbf24; color: #111; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; margin: 20px 0; }
                        .benefits { background: #fffbeb; padding: 20px; border-radius: 10px; margin: 20px 0; }
                        .benefits li { margin: 10px 0; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>🎯 Votre checklist est prête !</h1>
                    </div>
                    <div class="content">
                        <p>Bonjour <strong>${prenom}</strong>,</p>
                        
                        <p>Merci d'avoir téléchargé la checklist <strong>"Gagnez 5h/semaine avec 10 actions simples"</strong>.</p>
                        
                        <div class="benefits">
                            <p><strong>✅ Avec cette checklist, vous allez :</strong></p>
                            <ul>
                                <li>✔ Identifier les tâches à automatiser dès cette semaine</li>
                                <li>✔ Reprendre le contrôle sur votre agenda</li>
                                <li>✔ Libérer du temps pour scaler sereinement</li>
                            </ul>
                        </div>
                        
                        <p>Si vous souhaitez aller plus loin, je vous propose un <strong>audit gratuit de 30 minutes</strong> pour identifier ensemble vos axes d'optimisation.</p>
                        
                        <p style="text-align: center;">
                            <a href="https://calendly.com/" class="cta-button">📞 Réserver mon audit gratuit</a>
                        </p>
                        
                        <p>À très vite,<br><strong>Farid</strong><br>Expert en optimisation opérationnelle</p>
                    </div>
                    <div class="footer">
                        <p>© Inno-Mation | Cet email a été envoyé suite à votre demande de checklist.</p>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('Erreur Resend:', error);
            return NextResponse.json(
                { error: 'Erreur lors de l\'envoi de l\'email' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Erreur serveur:', error);
        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}
