import appConfig from "../config/appConfig";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">{appConfig.appName}</h1>
      <h2 className="text-xl">{appConfig.appDescription}</h2>
    </div>
  );
}
