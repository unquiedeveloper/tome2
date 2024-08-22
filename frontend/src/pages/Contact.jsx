import React from 'react'

function Contact() {
  return (
    <section className="bg-gray-100">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Visit Our Location</h2>
        <p className="mt-4 text-lg text-gray-500">
         Come, indulge in the rich flavours of the Middle East
        </p>
      </div>
      <div className="mt-16 lg:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.824955446978!2d77.34754774521798!3d28.638565149886794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfab2bb9f16c7%3A0x40abf3fed337a320!2s5%2C%20Windsor%20St%2C%20Vaibhav%20Khand%2C%20Indirapuram%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201014!5e0!3m2!1sen!2sin!4v1724319541908!5m2!1sen!2sin"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div>
            <div className="max-w-full mx-auto rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Our Address</h3>
                <p className="mt-1 text-gray-600">
                Shop 4 & 5, Windsor Street Park, Vaibhav Khand, Indirapuram, Ghaziabad
                </p>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                <p className="mt-1 text-gray-600">Monday - Sunday: 2am - 12pm</p>
                {/* <p className="mt-1 text-gray-600">Saturday: 10am - 4pm</p>
                <p className="mt-1 text-gray-600">Sunday: Closed</p> */}
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                <a href='mail to:tasteofmiddleeast07@gmail.com'>

                <p className="mt-1 text-gray-600">Email: tasteofmiddleeast07@gmail.com</p>
                </a>
                <a href='tel:9971200894'>

                <p className="mt-1 text-gray-600">Phone: 9971200894</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Contact