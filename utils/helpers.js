module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_time: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
}
