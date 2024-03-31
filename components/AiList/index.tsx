// components/AiList/index.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";

import AiFilter from "@/components/AiFilter";
import CartRate from "@/components/CartRating";
import ListPreloader from "@/components/ListPreloader";
import AccordionAiItems from "@/components/AccordionAiItems";
import AiLinkBox from "@/components/AiLinkBox";
import SearchBox from "@/components/SearchBox";
import Pagination from "@/components/Pagination";

import iconObj from "@/public/icons/utils";

import "./style.scss";

const AiList: React.FC = () => {
  const [aiList, setAiList] = useState<aiListStructured[] | null>(null);
  const [filteredAiList, setFilteredAiList] = useState<aiListStructured[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const aiListData = await fetchFromNotion();
      setAiList(aiListData);
      setFilteredAiList(aiListData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFromNotion = async (): Promise<aiListStructured[]> => {
    try {
      const deployedApiUrl = "/api/notion_ai_list";
      const res = await fetch(deployedApiUrl);
      const data = await res.json();
      return data.aiListStructured as aiListStructured[];
    } catch (error) {
      throw new Error(`Error fetching AI list: ${error}`);
    }
  };

  const handleCategoryFilter = (selectedCategories: string[]) => {
    if (selectedCategories.length === 0) {
      setFilteredAiList(aiList);
    } else {
      const filteredData = aiList!.filter(
        (ai) =>
          ai.ai_input.some((input) => selectedCategories.includes(input.name)) ||
          ai.ai_output.some((output) => selectedCategories.includes(output.name)) ||
          ai.ai_cost.some((cost) => selectedCategories.includes(cost.name)) ||
          ai.ai_uses.some((uses) => selectedCategories.includes(uses.name)) ||
          ai.ai_sector.some((sector) => selectedCategories.includes(sector.name)) ||
          ai.ai_api.some((api) => selectedCategories.includes(api.name)) ||
          ai.ai_from_ukr.some((urk) => selectedCategories.includes(urk.name))
      );
      setFilteredAiList(filteredData);
    }
    setCurrentPage(1); // При зміні фільтрації повертаємося на першу сторінку
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredData = aiList!.filter((ai) =>
      ai.ai_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAiList(filteredData);
    setCurrentPage(1); // При зміні пошукового запиту повертаємося на першу сторінку
  };

  const getUniqueCategories = (data: MultiSelectOption[][]) => {
    let categories = new Set<string>();
    data.forEach((item) => {
      item.forEach((category) => categories.add(category.name));
    });
    return Array.from(categories);
  };

  // Отримання поточних елементів на сторінці
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAiList?.slice(indexOfFirstItem, indexOfLastItem);

  // Зміна сторінки
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (aiList === null) {
    return <ListPreloader />;
  }

  return (
    <main>
      <div className="container">
        <div className="page-settings">
          <h2 className="page-title">Нейромережі</h2>
          <div className="ai-filters-sort-search-container">
            <div className="ai-filters-search-container">
              <div className="ai-search-container">
                <SearchBox onSearch={handleSearch} />
              </div>
              <div className="ai-filters-container">
                <div className="left-side">
                  <AiFilter
                    inActive={true}
                    filterName="Вхідні данні"
                    categories={getUniqueCategories(aiList.map((ai) => ai.ai_input))}
                    onSelectCategory={handleCategoryFilter}
                  />
                  <Image
                    className="icon p-t-10"
                    src={iconObj.arrowRightDash}
                    width={20}
                    height={20}
                    alt="Arrow to right"
                  />
                  <AiFilter
                    inActive
                    filterName="Вихідні данні"
                    categories={getUniqueCategories(aiList.map((ai) => ai.ai_output))}
                    onSelectCategory={handleCategoryFilter}
                  />
                </div>
                <div className="right-side">
                  <AiFilter
                    inActive={false}
                    filterName="Ціна"
                    categories={getUniqueCategories(aiList.map((ai) => ai.ai_cost))}
                    onSelectCategory={handleCategoryFilter}
                  />
                  <AiFilter
                    inActive={false}
                    filterName="Технологія ШІ"
                    categories={getUniqueCategories(aiList.map((ai) => ai.ai_uses))}
                    onSelectCategory={handleCategoryFilter}
                  />
                  <AiFilter
                    inActive={false}
                    filterName="Сектор використання"
                    categories={getUniqueCategories(aiList.map((ai) => ai.ai_sector))}
                    onSelectCategory={handleCategoryFilter}
                  />
                  <AiFilter
                    inActive={false}
                    filterName="API"
                    categories={getUniqueCategories(aiList.map((ai) => ai.ai_api))}
                    onSelectCategory={handleCategoryFilter}
                  />
                  <AiFilter
                    inActive={false}
                    filterName="🇺🇦"
                    categories={getUniqueCategories(aiList.map((ai) => ai.ai_from_ukr))}
                    onSelectCategory={handleCategoryFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ai-list-container">
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((ai, index) => (
              <div key={index} className="ai-item">
                <img className="prev-img" src={ai.ai_img_url} alt={ai.ai_name} />
                <div className="content-box">
                  <CartRate rate={ai.ai_rate} />
                  <AiLinkBox url={ai.ai_url} />
                  <div className="ai-title-box">
                    <p className="ai-name">{ai.ai_name}</p>
                    {ai.ai_from_ukr.some((type: MultiSelectOption) => type.name === "🇺🇦") && (
                      <div>
                        <span role="img" aria-label="Ukraine flag">
                          🇺🇦
                        </span>
                      </div>
                    )}
                  </div>
                  <AccordionAiItems description={ai.ai_description} />
                  <div className="property-box">
                    {[
                      ...ai.ai_uses.map((type: MultiSelectOption) => type.name),
                      ...ai.ai_sector.map((type: MultiSelectOption) => type.name),
                      ...ai.ai_cost.map((type: MultiSelectOption) => type.name),
                      ...ai.ai_api.map((type: MultiSelectOption) => type.name)
                    ].map((name: string, index: number) => (
                      <p className="property" key={index}>
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items match the selected categories.</p>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredAiList?.length || 0}
          paginate={paginate}
        />
      </div>
    </main>
  );
};

export default AiList;
