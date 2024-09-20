"use server";
import { z } from "zod";
import nodemailer from "nodemailer";

const schema = z.object({
  name: z.string().min(1, "Name cannot be blank"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message cannot be blank"),
});

export type ActionState = {
  errors: { message: string }[];
  success: boolean;
};

export async function contactAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues.map((issue) => ({
        message: issue.message,
      })),
      success: false,
    };
  }

  const { name, email, message } = validatedFields.data;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "simplelogin-newsletter.a9eny@simplelogin.com",
    subject: `New contact form submission from ${name}`,
    text: message,
    html: `
      <h1>New Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { errors: [], success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      errors: [{ message: "Failed to send email. Please try again." }],
      success: false,
    };
  }
}
