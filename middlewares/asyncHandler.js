// gunakan async handler agar kita tidak menggunakan try catch secara berulang

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next); // ambil req, res, dan next lalu tangkap errornya dengan next
};

export default asyncHandler;
