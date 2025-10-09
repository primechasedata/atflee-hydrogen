import {json, type ActionFunctionArgs} from '@shopify/remix-oxygen';

export async function action({request, context}: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email || typeof email !== 'string') {
      return json({error: 'Email is required'}, {status: 400});
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return json({error: 'Invalid email address'}, {status: 400});
    }

    // TODO: Integrate with your email service provider (Klaviyo, Mailchimp, etc.)
    // For now, we'll just log it
    console.log('Newsletter signup:', email);

    // You can integrate with Shopify Customer API or third-party services here
    // Example for Klaviyo:
    // const klaviyoResponse = await fetch('https://a.klaviyo.com/api/v2/list/{LIST_ID}/subscribe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     api_key: context.env.KLAVIYO_API_KEY,
    //     profiles: [{email}]
    //   })
    // });

    return json({
      success: true,
      message: 'Thank you for subscribing! Check your email to confirm.',
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return json(
      {error: 'Something went wrong. Please try again later.'},
      {status: 500},
    );
  }
}
