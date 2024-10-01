
const applyGiftCard = async (code, orderTotal) => {
    try {
      const response = await fetch('http://localhost:4000/api/apply-gift-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, orderTotal }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(`Gift card applied: ₹${data.deductedAmount}`);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error applying gift card:', error);
    }
  };
  