function Imprint() {
    return (
        <div className="flex flex-col justify-start items-start px-5 md:px-[20%] pt-10 text-2xl text-black/80 w-full overflow-auto">
            <b>Imprint</b>
            <b className="mt-10">According to § 5 TMG</b>
            <p className="text-sm md:text-xl font-medium mt-4">
                getXdone GmbH<br />
                Karpfenweg 1<br />
                76189 Karlsruhe<br />
                <br />
                Commercial Register: HRB 744721<br />
                VAT ID No.: DE355634381<br />
                Register Court: Mannheim District Court<br />
                <br />


                Represented by:<br />
                <b>Dr.-Ing. Florian Marthaler</b>
            </p>

            <b className="mt-5">Contact</b>
            <p className="text-sm md:text-xl font-medium mt-4">
                Phone: 01734383864<br />
                Email: info@boom-investment.de
            </p>

            <b className="mt-5">EU dispute Settlement</b>
            <p className="text-sm md:text-xl font-medium mt-4">
                The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/" className=" underline text-blue-600 mr-2">https://ec.europa.eu/consumers/odr/</a>
                Our email address can be found above in the imprint.
            </p>

            <b className="mt-5">Consumer dispute resolution/universal arbitration board</b>
            <p className="text-sm md:text-xl font-medium mt-4">
                We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.

            </p>



        </div>
    );
}

export default Imprint;