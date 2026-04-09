export function Projects() {
  return (
    <section className="font-serif text-xl mt-[30vh] sm:mt-[20vh]">
      <div className="pb-2 text-highlight text-center">
        Things I've done
      </div>
      <ul className="list-disc columns-1 mx-auto max-w-fit text-left">
        <li>
          <a href={"/osu"} className="underline">osu! mapping</a>
        </li>
        <li>
          <span>Programming</span>
          <span className="text-xs pl-2">wip</span>
        </li>
        <li>
          <span>YouTube</span>
          <span className="text-xs pl-2">wip</span>
        </li>
      </ul>
    </section>
  );
}
