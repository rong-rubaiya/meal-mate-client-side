import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b  from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-6">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center fontext mb-10">
          Contact <span className="text-orange-600">Us</span>
        </h1>

        {/* Wrapper */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Phone Card */}
          <div className="group">
            <div className="bg-white p-6 rounded-[40px] shadow-xl transform group-hover:scale-[1.05] transition-all duration-300 relative overflow-hidden">
              
              {/* Fish curve */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-300 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition"></div>

              <Phone className="w-12 h-12 text-orange-600 mb-4" />
              <h2 className="text-xl font-semibold fontext mb-2">Phone Number</h2>
              <p className="text-gray-600 text-lg">+880 1234 567890</p>
              <p className="text-gray-600 text-lg">+880 9876 543210</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="group">
            <div className="bg-white p-6 rounded-[40px] shadow-xl transform group-hover:scale-[1.05] transition-all duration-300 relative overflow-hidden">
              
              {/* Plate shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-transparent rounded-[40px] pointer-events-none"></div>

              <Mail className="w-12 h-12 text-orange-600 mb-4" />
              <h2 className="text-xl font-semibold fontext mb-2">Email</h2>
              <p className="text-gray-600 text-lg">support@mealmate.com</p>
              <p className="text-gray-600 text-lg">help@mealmate.com</p>
            </div>
          </div>

          {/* Address Card */}
          <div className="group">
            <div className="bg-white p-6 rounded-[40px] shadow-xl transform group-hover:scale-[1.05] transition-all duration-300 relative overflow-hidden">
              
              {/* Fish shadow */}
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-200 rounded-full blur-xl opacity-40"></div>

              <MapPin className="w-12 h-12 text-orange-600 mb-4" />
              <h2 className="text-xl font-semibold fontext mb-2">Address</h2>
              <p className="text-gray-600 text-lg">Hostel Canteen,Dhaka</p>
              <p className="text-gray-600 text-lg">Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-10">
          We are always here to help you. Reach out anytime!
        </p>
      </div>
    </div>
  );
}
