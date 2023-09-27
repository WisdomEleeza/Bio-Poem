import { BiSearchAlt2 } from 'react-icons/bi';
import { useState } from 'react'
import { useAppDispatch } from '../store/store';
import { selectFontFamily } from '../store/formSlice';


const fonts = [
    "Acme",
    "Alegreya",
    'Amatic SC',
    "Black Ops One",
    "Bodoni Moda",
    "Caveat",
    "Chakra Petch",
    "Cinzel",
    "Creepster",
    "Croissant One",
    "Dancing Script",
    "Great Vibes",
    "Gruppo",
    "Homemade Apple",
    "Inclusive Sans",
    "Kaushan Script",
    "Kenia",
    "Lilita One",
    "Lobster Two",
    "Macondo",
    "Merriweather Sans",
    "Montserrat Alternates",
    "Patua One",
    "Permanent Marker",
    "Playfair Display",
    "Roboto Mono",
    "Satisfy",
    "Special Elite",
    "Tangerine",
    "Ubuntu Condensed",
];



export const FontStyles = () => {
    const dispatch = useAppDispatch();

    const [searchInput, setSearchInput] = useState<string>(''); 

    const filteredFonts = fonts.filter((font) =>
    font.toLowerCase().includes(searchInput.toLowerCase())
    );

    const selectFont = (font: string): void => {
        dispatch(selectFontFamily(font))
        }
return (
    <div className="border border-r-2 border-t-0 border-b-0 border-l-0 pr-4 pt-0 pl-0 h-full">
        {/* Search bar */}
        <div className='flex items-center p-2 border border-customGrey1 rounded-lg'>
            <BiSearchAlt2 className="text-[#8E8D8D]"/>
            <input 
                type="search" 
                name="fontStyles" 
                placeholder="Search fonts"
                className='ml-2 outline-none'
                onChange={(e)=> setSearchInput(e.target.value)}/>
        </div>
        {/* Font Options */}
        <div className='mt-4'>
            <div className='border border-r-0 border-t-0 border-b-1 border-l-0'>All fonts</div>
            <ul className='h-[650px] overflow-scroll scrollbar-hide flex flex-col justify-between gap-y-2 mt-3'>
                {
                    filteredFonts.map((font, index) => 
                        <li 
                            style={{fontFamily: font, padding: index === 0 ? ' 0  0 4px 0 ' : '4px 0' }}
                            className='text-2xl cursor-pointer hover:bg-customGrey1'
                            onMouseOver={()=>selectFont(font)}
                            onClick={()=>selectFont(font)}
                            key={index}>
                            {font}
                        </li>
                        )
                }
            </ul>
        </div>
    </div>
    )
}
