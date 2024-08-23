import React from 'react';

function Confirm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="text-4xl font-bold mb-4">
        <span role="img" aria-label="party-popper" className="inline-block">
          🎉
        </span> 
        Order Placed Successfully!
      </div>
      <p className="text-lg mb-2">
      Your order has been placed and will be delivered soon.
      </p>
      <p className="text-lg mb-6">
        For Order   query contact us  at  : 
        <span className="font-semibold ml-2">
        <a  href='tel:9971200894' >
        9971200894

        </a></span>
      </p>
      <div className="flex space-x-4 mb-4">
        {/* <a href="/order-history" className="text-green-600 hover:underline">
          📋 View Order History
        </a> */}
        <a href="/" className="text-[#da9858] hover:underline">
          🏠 Back to Homepage
        </a>
      </div>
      {/* <p className="text-sm text-gray-600">
        A confirmation email has been sent to your email address. A tracking link will be provided to you via email once your order is shipped.
      </p> */}
    </div>
  );
}

export default Confirm;
