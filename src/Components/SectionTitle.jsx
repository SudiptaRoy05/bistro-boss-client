
export default function SectionTitle({ heading, subHeading }) {
    return (
        <div className="mb-20 md:w-4/12 mx-auto ">
            <p className="text-yellow-600 text-center mb-2">---{subHeading}---</p>
            <h3 className="text-3xl uppercase py-3 text-center border-t-2 border-b-2">{heading}</h3>
        </div>
    )
}
