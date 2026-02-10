export default function TitleDialog({titleDialogRef}) {
    // TODO: have instructions on goal
    // TODO: Get the link highlighted
    return (
        <dialog ref={titleDialogRef} className='text-center m-auto modal'>
            <div className='modal-box'>
                <h1 className='font-title text-heading text-2xl font-bold'><span className='line-through'>Un</span>fair Flips</h1>
                <h2 className='mb-2'>A raw exercise in probability inspired by <a href='https://store.steampowered.com/app/3925760/Unfair_Flips/'>Unfair Flips</a></h2>
                <form method='dialog'>
                    <button className='block mx-auto btn btn-sm btn-primary'>Play</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Close</button>
            </form>
        </dialog>);
}