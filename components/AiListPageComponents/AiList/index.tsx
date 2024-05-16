// components/AiList/index.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Rodal from "rodal";

// Components
import Filter from "@/components/BasicСomponents/Filter";
import CartRate from "@/components/AiListPageComponents/AiListCartRating";
import AiListPreloader from "@/components/AiListPageComponents/AiListPreloader";
import AccordionAiItems from "@/components/AiListPageComponents/AiListCardAccordion";
import AiLinkBox from "@/components/AiListPageComponents/AiListLinkBox";
import SearchBox from "@/components/AiListPageComponents/AiListSearchBox";
import Pagination from "@/components/BasicСomponents/Pagination";
import SortOptions from "@/components/BasicСomponents/ListSort";

// Icons
import iconObj from "@/public/icons/utils";

// Styles
import "rodal/lib/rodal.css";
import "./style.scss";

const AiList: React.FC = () => {
  const [aiList, setAiList] = useState<aiListStructured[] | null>(null);
  const [filteredAiList, setFilteredAiList] = useState<aiListStructured[] | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(12);
  const [sortType, setSortType] = useState<string>("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  // Show modal filers on mobile
  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

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
    setSelectedCategories(selectedCategories);
    if (selectedCategories.length === 0) {
      setFilteredAiList(aiList);
    } else {
      const filteredData = aiList!.filter((ai) =>
        selectedCategories.every(
          (category) =>
            ai.ai_input.some((input) => input.name === category) ||
            ai.ai_output.some((output) => output.name === category) ||
            ai.ai_cost.some((cost) => cost.name === category) ||
            ai.ai_uses.some((uses) => uses.name === category) ||
            ai.ai_sector.some((sector) => sector.name === category) ||
            ai.ai_api.some((api) => api.name === category) ||
            ai.ai_from_ukr.some((urk) => urk.name === category)
        )
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

  const handleSort = (type: string) => {
    setSortType(type);
    let sortedList = [...(filteredAiList ?? [])];
    switch (type) {
      case "newest":
        sortedList.sort(
          (a, b) => (new Date(b.ai_date_post) as any) - (new Date(a.ai_date_post) as any)
        );
        break;
      case "oldest":
        sortedList.sort(
          (a, b) => (new Date(a.ai_date_post) as any) - (new Date(b.ai_date_post) as any)
        );
        break;
      case "highest-rated":
        sortedList.sort((a, b) => b.ai_rate - a.ai_rate);
        break;
      case "lowest-rated":
        sortedList.sort((a, b) => a.ai_rate - b.ai_rate);
        break;
      default:
        break;
    }
    setFilteredAiList(sortedList);
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
    return <AiListPreloader />;
  }

  return (
    <>
      <div className="page-settings">
        <div className="ai-filters-sort-search-container">
          <div className="ai-filters-search-container">
            <div className="ai-search-container">
              <SearchBox onSearch={handleSearch} />
            </div>
            <div className="ai-filters-container">
              <div className="left-side">
                <Filter
                  inActive
                  filterName="Вхідні данні"
                  categories={getUniqueCategories(aiList.map((ai) => ai.ai_input))}
                  onSelectCategory={(selectedCategories) => {
                    handleCategoryFilter(selectedCategories);
                  }}
                  selectedCategories={selectedCategories}
                />
                <Image
                  className="icon p-t-10"
                  src={iconObj.arrowRightDash}
                  width={20}
                  height={20}
                  alt="Arrow to right"
                />
                <Filter
                  inActive
                  filterName="Вихідні данні"
                  categories={getUniqueCategories(aiList.map((ai) => ai.ai_output))}
                  onSelectCategory={(selectedCategories) => {
                    handleCategoryFilter(selectedCategories);
                  }}
                  selectedCategories={selectedCategories}
                />
              </div>
              <div className="right-side">
                <Filter
                  inActive={false}
                  filterName="Ціна"
                  categories={getUniqueCategories(aiList.map((ai) => ai.ai_cost))}
                  onSelectCategory={(selectedCategories) => {
                    handleCategoryFilter(selectedCategories);
                  }}
                  selectedCategories={selectedCategories}
                />
                <Filter
                  inActive={false}
                  filterName="Технологія ШІ"
                  categories={getUniqueCategories(aiList.map((ai) => ai.ai_uses))}
                  onSelectCategory={(selectedCategories) => {
                    handleCategoryFilter(selectedCategories);
                  }}
                  selectedCategories={selectedCategories}
                />
                <Filter
                  inActive={false}
                  filterName="Сектор використання"
                  categories={getUniqueCategories(aiList.map((ai) => ai.ai_sector))}
                  onSelectCategory={(selectedCategories) => {
                    handleCategoryFilter(selectedCategories);
                  }}
                  selectedCategories={selectedCategories}
                />
                <Filter
                  inActive={false}
                  filterName="API"
                  categories={getUniqueCategories(aiList.map((ai) => ai.ai_api))}
                  onSelectCategory={(selectedCategories) => {
                    handleCategoryFilter(selectedCategories);
                  }}
                  selectedCategories={selectedCategories}
                />
                <Filter
                  inActive={false}
                  filterName="🇺🇦"
                  categories={getUniqueCategories(aiList.map((ai) => ai.ai_from_ukr))}
                  onSelectCategory={(selectedCategories) => {
                    handleCategoryFilter(selectedCategories);
                  }}
                  selectedCategories={selectedCategories}
                />
              </div>

              <div className="filters-modile-trigger-sort-container">
                <div className="ai-filters-modal-trigger" onClick={toggleFilters}>
                  <Image src={iconObj.filter} alt="Filter" width={20} height={20} />
                  <p>Фільтри</p>
                </div>
                <div className="ai-sort-container">
                  <SortOptions handleSort={handleSort} />
                </div>
              </div>

              <Rodal
                visible={isFiltersVisible}
                onClose={toggleFilters}
                width={0}
                height={0}
                customStyles={{ height: "100%", width: "100%" }}
                className="filters-modal"
                animation="slideUp"
              >
                <div className="modal-top-section">
                  <div className="filters-title">
                    <p>Фільтри</p>
                  </div>
                  <div className="filters-container-modal">
                    <Filter
                      inActive={false}
                      filterName="Ціна"
                      categories={getUniqueCategories(aiList.map((ai) => ai.ai_cost))}
                      onSelectCategory={(selectedCategories) => {
                        handleCategoryFilter(selectedCategories);
                      }}
                      selectedCategories={selectedCategories}
                    />
                    <Filter
                      inActive={false}
                      filterName="Технологія ШІ"
                      categories={getUniqueCategories(aiList.map((ai) => ai.ai_uses))}
                      onSelectCategory={(selectedCategories) => {
                        handleCategoryFilter(selectedCategories);
                      }}
                      selectedCategories={selectedCategories}
                    />
                    <Filter
                      inActive={false}
                      filterName="Сектор використання"
                      categories={getUniqueCategories(aiList.map((ai) => ai.ai_sector))}
                      onSelectCategory={(selectedCategories) => {
                        handleCategoryFilter(selectedCategories);
                      }}
                      selectedCategories={selectedCategories}
                    />
                    <Filter
                      inActive={false}
                      filterName="API"
                      categories={getUniqueCategories(aiList.map((ai) => ai.ai_api))}
                      onSelectCategory={(selectedCategories) => {
                        handleCategoryFilter(selectedCategories);
                      }}
                      selectedCategories={selectedCategories}
                    />
                    <Filter
                      inActive={false}
                      filterName="🇺🇦"
                      categories={getUniqueCategories(aiList.map((ai) => ai.ai_from_ukr))}
                      onSelectCategory={(selectedCategories) => {
                        handleCategoryFilter(selectedCategories);
                      }}
                      selectedCategories={selectedCategories}
                    />
                  </div>
                </div>
                <div className="modal-bottom-section">
                  <button onClick={toggleFilters} className="btn btn-active">
                    Застосувати
                  </button>
                </div>
              </Rodal>
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
    </>
  );
};

export default AiList;
