import {json, type ActionFunctionArgs} from '@shopify/remix-oxygen';

export async function action({request, context}: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const orderNumber = formData.get('order');
    const message = formData.get('message');

    // Validation
    if (!name || typeof name !== 'string') {
      return json({error: 'Name is required'}, {status: 400});
    }

    if (!email || typeof email !== 'string') {
      return json({error: 'Email is required'}, {status: 400});
    }

    if (!message || typeof message !== 'string') {
      return json({error: 'Message is required'}, {status: 400});
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return json({error: 'Invalid email address'}, {status: 400});
    }

    // TODO: Integrate with your email service provider (SendGrid, Mailgun, etc.)
    // For now, we'll just log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      orderNumber,
      message,
      timestamp: new Date().toISOString(),
    });

    // You can integrate with email services here
    // Example for SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(context.env.SENDGRID_API_KEY);
    // const msg = {
    //   to: 'support@trahere.com',
    //   from: 'noreply@trahere.com',
    //   replyTo: email,
    //   subject: `Contact Form: ${name}${orderNumber ? ` - Order #${orderNumber}` : ''}`,
    //   text: message,
    //   html: `
    //     <p><strong>From:</strong> ${name} (${email})</p>
    //     ${orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : ''}
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `,
    // };
    // await sgMail.send(msg);

    return json({
      success: true,
      message:
        'Thank you for contacting us! We will respond within 24 hours.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return json(
      {error: 'Something went wrong. Please try again later.'},
      {status: 500},
    );
  }
}
