export const H1 = ({ children }) => {
  return (
    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
      {children}
    </h1>
  );
};

export const H2 = ({ children }) => {
  return (
    <h2 className="block text-3xl font-extrabold tracking-tight text-white">
      {children}
    </h2>
  );
};
