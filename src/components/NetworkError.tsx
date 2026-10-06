export const NetworkError = ({ errorMsg }: { errorMsg?: string }) => {
  return (
    <div className="w-full pt-20 justify-center flex">
      <div className="text-red-500 montserrat-semibold text-3xl lg:text-4xl">
        {errorMsg ?? "Invalid Request"}
      </div>
    </div>
  );
};
