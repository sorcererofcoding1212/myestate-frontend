import axios from "@/lib/axios";
import { VIEW_LISTING } from "@/lib/constants";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface QuickSearchProps {
  address: string;
  city: string;
  state: string;
  postal_code: string;
  banner: string;
  listing_type: string;
  property_type: string;
  id: string;
}

export const SearchInput = ({ className }: { className?: string }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<QuickSearchProps[]>([]);

  const navigate = useNavigate();

  const fetchSearchResults = async () => {
    if (search.length < 1) return;
    try {
      const response = await axios.get("/properties/quick-search", {
        params: {
          q: search,
          offset: 5,
        },
      });

      setSearchResults(response.data);
    } catch (error: any) {
      toast.error(error.response.data.detail ?? "Some error occured");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchSearchResults, 500);

    return () => {
      clearTimeout(timeoutId);
      setSearchResults([]);
    };
  }, [search]);

  return (
    <div className="relative rounded-md bg-white">
      <form>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter an address, landmark, city, or ZIP code"
          className={cn(
            "py-3 lg:py-6 px-4 lg:px-6 rounded-md w-[90%] focus:outline-none truncate text-sm lg:text-base",
            className,
          )}
        />
      </form>
      <SearchIcon className="absolute text-primary top-[50%] size-4 lg:size-6 opacity-80 cursor-pointer translate-y-[-50%] right-4" />
      {searchResults.length > 0 && (
        <div className="max-h-56 overscroll-y-contain  lg:max-h-72 overflow-y-auto w-full absolute top-full overflow-hidden mt-1 lg:mt-2 left-0 right-0 rounded-md bg-white border z-50">
          {searchResults.map((r, index) => (
            <div
              onClick={() => navigate(`${VIEW_LISTING}/${r.id}`)}
              key={index}
              className="flex items-center px-4 lg:px-6 py-3 lg:py-4 lg:hover:bg-primary-muted-background hover:cursor-pointer border-b border-primary-muted gap-x-3 lg:gap-x-4"
            >
              <div className="h-16 w-36 lg:h-24 lg:w-44 rounded overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={r.banner}
                  alt="photo"
                />
              </div>
              <div className="flex flex-col gap-y-2 lg:gap-y-4 w-[60%]">
                <div className="flex gap-x-3 lg:gap-x-4 text-[10px] lg:text-xs">
                  <span className="px-2 lg:px-3 py-1 bg-primary-muted-background rounded-md">
                    For {capitalizeFirstLetter(r.listing_type)}
                  </span>
                  <span className="px-2 lg:px-3 py-1 bg-primary-muted-background rounded-md">
                    {capitalizeFirstLetter(r.property_type)}
                  </span>
                </div>
                <div className="text-primary leading-4 lg:leading-5 text-xs lg:text-sm">
                  {`${r.address}, ${r.city}, ${r.state}, ${r.postal_code}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
