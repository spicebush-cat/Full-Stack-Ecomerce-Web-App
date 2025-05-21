const WhyChooseUs = () => {
  const Quality = [
    {
      quality: "Quality Assurance",
      explaine:
        "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
    },
    {
      quality: "Convenience:",
      explaine:
        "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
    },
    {
      quality: "Exceptional Customer Service:",
      explaine:
        "Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.",
    },
  ];
  return (
    <div className="flex flex-col sm:flex-row text-sm">
      {Quality.map((p, index) => (
        <div
          key={index}
          className="flex flex-col  border-[0.5px] border-gray-200 gap-6 px-10 py-[50px] w-[27vw]"
        >
          <p className="font-semibold"> {p.quality}</p>
          <p className="text-gray-500">{p.explaine}</p>
        </div>
      ))}
    </div>
  );
};
export default WhyChooseUs;
