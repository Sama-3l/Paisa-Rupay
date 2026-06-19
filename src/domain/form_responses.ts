// lib/sendMail.ts
import { Resend } from 'resend'
import { 
  ApplyForLoanFormData, 
  ContactUsFormData, 
  BankerPartnershipFormData,
  FreeConsultationFormData
} from '../lib/types'

const resend = new Resend(process.env.RESEND_API_KEY)
const websiteUrl : string = process.env.WEBSITE_CONTACT_US_SHEET_LINK || ""

const FROM = 'Paisa Rupay <contact@paisarupay.com>'
const TO = 'paisarupay0@gmail.com' // where you receive the emails

async function sendResponse(email : string){
    try {
    // A: Confirmation email to the visitor (using strictly static text to avoid custom spam relay)
    await resend.emails.send({
      from: FROM,
      to: [email],
      replyTo: 'contact@paisarupay.com',
      subject: `Thank you for contacting us.`,
      html: `
        <p>Thank you for reaching out to us</p>
        <br>
        <p>We'll get back to you and help however we can.</p>
      `,
    });
  } catch (error) {
    console.error('Email send error:', error);
  }
}

async function sheetUpdate(formData : ApplyForLoanFormData | ContactUsFormData | BankerPartnershipFormData | FreeConsultationFormData){
  const response = await fetch(websiteUrl, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
    redirect: 'follow'
  });

  console.log('Status:', response.status)
  console.log('Body:', await response.json())
}

export async function sendLoanApplicationMail(data: ApplyForLoanFormData) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `New Loan Application - ${data.name}`,
    html: `
      <h2>New Loan Application</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>LoanType:</strong> ${data.loanType}</p>
    `,
  })

  await sheetUpdate(data);

  if (error) throw new Error(error.message)
}

export async function sendContactUsMail(data: ContactUsFormData) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `New Contact Us Message - ${data.name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
  })

  await sendResponse(data.email);
  await sheetUpdate(data);

  if (error) throw new Error(error.message)
}

export async function sendBankerPartnershipMail(data: BankerPartnershipFormData) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `New Banker Partnership Request - ${data.name}`,
    html: `
      <h2>New Banker Partnership Request</h2>
      <p><strong>Contact:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
    `,
  })

  await sheetUpdate(data);

  if (error) throw new Error(error.message)
}

export async function sendFreeConsultationMail(data: FreeConsultationFormData) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: `New Free Consultation Request - ${data.name}`,
    html: `
      <h2>New Free Consultation Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      ${data.message.length > 1 ? `<p><strong>Comment:</strong> ${data.message}</p>` : ``}
    `,
  })

  await sheetUpdate(data);

  if (error) throw new Error(error.message)
}