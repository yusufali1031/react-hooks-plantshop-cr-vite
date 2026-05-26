import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  function handleAddPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => setPlants([...plants, data]));
  }

  function handleToggleStock(id) {
    setPlants(
      plants.map((plant) =>
        plant.id === id
          ? { ...plant, isSoldOut: !plant.isSoldOut }
          : plant
      )
    );
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search setSearchTerm={setSearchTerm} />
      <PlantList
        plants={filteredPlants}
        onToggleStock={handleToggleStock}
      />
    </main>
  );
}

export default PlantPage;