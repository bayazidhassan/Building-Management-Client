import { Map, Marker, ZoomControl } from "pigeon-maps"

const Location = () => {

    return (
        <div className="my-10">

            <h2 className="mb-4 text-2xl font-bold text-center text-cyan-500">HOW TO GET THERE</h2>

            <Map height={300} defaultCenter={[23.7948, 90.4165]} defaultZoom={11} >
                <Marker width={50} anchor={[23.7948, 90.4165]} />
                <ZoomControl />
            </Map>
        </div>
    );
};

export default Location;