import { Card } from "./components/card"; // Import Card component

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-200 text-black">
      {/* Welcome Section */}
      <div className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-6xl font-extrabold mb-4 text-teal-500 pixel-font">
          Welcome to BookRent
        </h1>
        <p className="text-2xl text-gray-700 pixel-font">
          Discover, rent, and enjoy your favorite books with ease.
        </p>
      </div>

      {/* Feature Cards Section */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
        {/* Card for Browse Collection */}
        <Card>
          <Card.Header>
            <Card.Title className="text-3xl font-semibold mb-2 text-brown-700 pixel-font">
              Browse Collection
            </Card.Title>
            <Card.Description className="text-xl text-gray-800 mb-4 pixel-font">
              Explore a wide variety of books across genres and authors.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <a
              href="/books"
              className="text-amber-500 font-medium hover:underline pixel-font"
            >
              Browse Books
            </a>
          </Card.Content>
        </Card>

        {/* Card for Easy Rentals */}
        <Card>
          <Card.Header>
            <Card.Title className="text-3xl font-semibold mb-2 text-brown-700 pixel-font">
              Easy Rentals
            </Card.Title>
            <Card.Description className="text-xl text-gray-800 mb-4 pixel-font">
              Rent books online and pick them up at your convenience.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <a
              href="/rent"
              className="text-amber-500 font-medium hover:underline pixel-font"
            >
              Rent Now
            </a>
          </Card.Content>
        </Card>

        {/* Card for Manage Account */}
        <Card>
          <Card.Header>
            <Card.Title className="text-3xl font-semibold mb-2 text-brown-700 pixel-font">
              Your Account
            </Card.Title>
            <Card.Description className="text-xl text-gray-800 mb-4 pixel-font">
              Track your rentals, returns, and manage your profile.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <a
              href="/account"
              className="text-amber-500 font-medium hover:underline pixel-font"
            >
              Go to Account
            </a>
          </Card.Content>
        </Card>
      </div>
    </main>
  );
}
