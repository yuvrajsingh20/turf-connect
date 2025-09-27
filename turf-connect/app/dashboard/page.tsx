import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import clientPromise from "@/lib/mongodb";
import User from "@/models/User";

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const logged = localStorage.getItem("turf-auth");
      if (logged !== "true") {
        router.replace("/auth");
        return;
      }

      const client = await clientPromise;
      const db = client.db();
      const email = localStorage.getItem("userEmail"); // Assuming you store user email in local storage
      const user = await db.collection("users").findOne({ email });

      if (user) {
        setUserData(user);
      }
    };

    fetchUserData();
  }, [router]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Header />
      <section className="bg-background">
        <div className="mx-auto max-w-md px-4 py-10">
          <h1 className="text-2xl font-bold">Welcome, {userData.email}</h1>
          {/* Additional user-specific information can be displayed here */}
        </div>
      </section>
    </main>
  );
}