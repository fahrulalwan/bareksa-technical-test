export default function Header() {
  return (
    <header className="flex items-center bg-white p-5">
      <img src="/logo/bareksa.svg" alt="bareksa logo" className="w-40" />

      <button
        type="button"
        className="ml-12 mr-auto flex items-center rounded px-5 py-2 hover:bg-gray-200"
      >
        <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#909090]/10 font-bold">
          RH
        </span>

        <span className="block text-left">
          <span className="block font-bold">Reinhart H.</span>
          <span className="block text-sm text-[#9C9C9C]">Kemang, Jakarta</span>
        </span>

        <img className="ml-8" src="/icon/chevron-down.svg" alt="load more" />
      </button>

      <div className="relative">
        <input
          type="text"
          className="w-80 rounded border border-[#DDDDDD] py-3 pl-4 pr-12 font-semibold tracking-wide placeholder:text-[#9C9C9C] focus:border-gray-500 focus:outline-none"
          placeholder="Search text"
        />
        <img
          src="/icon/search.svg"
          alt="search"
          className="pointer-events-none absolute inset-y-0 right-4 top-1/2 -translate-y-1/2"
        />
      </div>

      <button
        type="button"
        className="relative ml-3 rounded p-2 hover:bg-gray-200"
      >
        <img src="/icon/bell.svg" alt="bell" className="h-6 w-6" />

        <span className="absolute top-0 right-0 inline-block h-2 w-2 rounded-full bg-[#C25B3A]" />
      </button>

      <button
        type="button"
        className="relative ml-3 rounded p-2 hover:bg-gray-200"
      >
        <img src="/icon/cog.svg" alt="settings" className="h-6 w-6" />
      </button>
    </header>
  );
}
