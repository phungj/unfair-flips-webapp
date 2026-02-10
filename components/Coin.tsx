import Image from 'next/image'
import headsImage from '../public/Heads.png'
import tailsImage from '../public/Tails.png'

export default function Coin({flip}) {
    const isHeads = flip === 'Heads'

    return (
        <div className='relative w-xs aspect-square'>
            <Image src={isHeads ? headsImage : tailsImage} alt={isHeads ? 'The heads side of a penny' : 'The tails side of a penny'} fill/>
        </div>);

}