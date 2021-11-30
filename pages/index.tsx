import Image from "next/image";

import Container from "../components/Container";

function HomePage() {
  return (
    <>
      <Container>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">
            Hey, I'm aa Senior Software Engineer at Company. I enjoy working
            with Next.js and crafting beautiful front-end experiences.
          </h1>
          <p>
            This portfolio is built with Next.js and a library called next-mdx.
            It allows you to write Markdown and focus on the content of your
            portfolio.
          </p>

          <p>Deploy your own in a few minutes.</p>
        </div>

        <div className="container max-w-4xl m-auto px-4 mt-20">
          <img
            src="http://3.15.169.202/vs/img/4683.jpg"
            alt="my desk"
            width={1920 / 4}
            height={1280 / 4}
          />
        </div>
      </Container>
    </>
  );
}

export default HomePage;
