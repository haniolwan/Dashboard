import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
    return (
        <div>
            <label
                htmlFor="simple-search"
                className="sr-only">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FontAwesomeIcon className="text-[#ADB5BD]" icon={faMagnifyingGlass} />
                </div>
                <input type="text"
                    id="simple-search"
                    className="rounded-lg pl-10 p-2.5 w-full"
                    placeholder="Search" />
            </div>
        </div>
    )
}
export default Search;