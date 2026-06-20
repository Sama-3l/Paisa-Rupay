import { ApplyForLoanFormData, BankerPartnershipFormData, ContactUsFormData, FreeConsultationFormData } from '@/src/lib/types';
import { rateLimit } from '@/src/lib/rate-limit';
import { NextResponse } from 'next/server';
import { sendBankerPartnershipMail, sendContactUsMail, sendFreeConsultationMail, sendLoanApplicationMail } from '@/src/domain/form_responses';

// Rate limiter: 5 requests per 60 seconds per IP
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per interval
});

export async function POST(request: Request) {

    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    try {
        await limiter.check(5, ip); // 5 requests per minute
    } catch {
        return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
        );
    }
    type FormData = ApplyForLoanFormData | ContactUsFormData | BankerPartnershipFormData | FreeConsultationFormData
    let body : FormData;
    try {
        body = await request.json() as FormData;
        switch(body.type){
            case 'apply for loan':
                await sendLoanApplicationMail(body)
                break

            case 'contact us':
                await sendContactUsMail(body)
                break

            case 'banker partnership':
                await sendBankerPartnershipMail(body)
                break

            case 'free consultation':
                await sendFreeConsultationMail(body)
                break

            default:
            return NextResponse.json({ error: 'Unknown form type' }, { status: 400 })
        }
    } catch {
        return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
        );
    }
    return NextResponse.json(
        { message : "message received"},
        {status : 200}
    )
}