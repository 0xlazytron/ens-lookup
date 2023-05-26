import { ethers } from "ethers";
import { useState, useRef } from "react";

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/e5444737d3164deba17ae3318c3a15b9 "
);

const useENS = () => {
  const [names, setNames] = useState({});

  const getName = (addr) => {
    if (names[addr]) return names[addr];

    console.log("fetching address.. ");
    provider.lookupAddress(addr).then((resolvedName) => {
      setNames((prev) => ({ ...prev, [addr]: resolvedName ?? addr }));
      return resolvedName ?? addr;
    });
  };

  return {
    names,
    getName
  };
};

export default function App() {
  const addrRef = useRef();

  const { getName, names } = useENS();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("typed addr", addrRef.current.value);
    getName(addrRef.current.value);
  };

  return (
    <div className="m-4">
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Public adddress to ENS
          </h1>
          <form className="m-4" onSubmit={handleSubmit}>
            <div className="my-3">
              <input
                ref={addrRef}
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="ETH Address"
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
              >
                Resolve Name
              </button>
            </div>
            <div className="mt-5">
              {Object.keys(names).map((key) => {
                return (
                  <p key={key}>
                    {key} => {names[key]}
                  </p>
                );
              })}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
