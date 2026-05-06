import { Eyebrow } from "../ui/Eyebrow";
import { AutoPlayVideo } from "../ui/AutoPlayVideo";

export function Story() {
  return (
    <section id="story" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tighter2 text-ink-900 md:text-[56px]">
            The Story Behind
            <br />
            <span className="font-serif italic font-medium text-primary-200">
              Providocs
            </span>
          </h2>
        </div>

        <div className="relative mt-14 overflow-hidden rounded-3xl ring-1 ring-tertiary-100 shadow-card">
          <AutoPlayVideo
            src="/images/providocs-demo.mp4"
            poster="/images/video-thumbnail.jpg"
          />
        </div>
      </div>
    </section>
  );
}
