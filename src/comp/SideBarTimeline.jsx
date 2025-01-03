import { Box } from "@mui/material";

export default function SideBarTimeline({ stops }) {
  if (!Array.isArray(stops) || stops.length === 0) {
    return <div>There are no stops to display.</div>;
  }

  return (
    <Box className="flex flex-col items-center w-full">
      <h2 className="text-xl font-bold mb-6">Trip Days</h2>
      <div className="w-full flex flex-col">
        {stops.map((stop, index) => (
          <div key={index} className="flex justify-between w-full">
            <span className="text-lg font-semibold w-1/3 text-right break-words">{stop}</span>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full shadow-md flex justify-center items-center">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              {index < stops.length - 1 && (
                <div className="w-[2px] bg-gray-800 flex-grow min-h-[3vh] sm:min-h-[5vh] md:min-h-[6vh] lg:min-h-[8vh]"></div>
              )}
            </div>
            <span className="text-lg font-semibold w-1/3">{`Day ${index + 1}`}</span>
          </div>
        ))}
      </div>
    </Box>
  );
}
