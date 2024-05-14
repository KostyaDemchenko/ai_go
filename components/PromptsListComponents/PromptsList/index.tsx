// components/promptsList/index.tsx

import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Image from "next/image";
import Rodal from "rodal";

// Components
import Filter from "@/components/BasicСomponents/Filter";
import CartRate from "@/components/PromptsListComponents/CartRating";
import DownloadBtn from "@/components/BasicСomponents/DownloadBtn";
import AccordionPromptsItems from "@/components/PromptsListComponents/AccordionPromtsItems";
import Pagination from "@/components/BasicСomponents/Pagination";
import SortOptions from "@/components/BasicСomponents/ListSort";
import YoutubeModal from "@/components/BasicСomponents/YoutubeModal";

// Icons
import iconObj from "@/public/icons/utils";

import PromptListPreloader from "@/components/PromptsListComponents/PromptListPreloader";

// Styles
import "rodal/lib/rodal.css";
import "./style.scss";

const PromptsList: React.FC = () => {
  const [promptsList, setPromptsList] = useState<promtsListStructured[] | null>(null);
  const [filteredPromptsList, setFilteredPromptsList] = useState<promtsListStructured[] | null>(
    null
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
      const promptsListData = await fetchFromNotion();
      setPromptsList(promptsListData);
      setFilteredPromptsList(promptsListData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFromNotion = async (): Promise<promtsListStructured[]> => {
    try {
      const deployedApiUrl = "/api/notion_prompts_list";
      const res = await fetch(deployedApiUrl);
      const data = await res.json();
      return data.promtsListStructured as promtsListStructured[];
    } catch (error) {
      throw new Error(`Error fetching AI list: ${error}`);
    }
  };

  const handleCategoryFilter = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories);
    if (selectedCategories.length === 0) {
      setFilteredPromptsList(promptsList);
    } else {
      const filteredData = promptsList!.filter((prompt) =>
        selectedCategories.every(
          (category) =>
            prompt.prompt_type.some((type) => type.name === category) ||
            prompt.prompt_speciality.some((speciality) => speciality.name === category) ||
            prompt.prompt_ai_title.some((title) => title.name === category)
        )
      );
      setFilteredPromptsList(filteredData);
    }
    setCurrentPage(1);
  };

  const handleSort = (type: string) => {
    setSortType(type);
    let sortedList = [...(filteredPromptsList ?? [])];
    switch (type) {
      case "newest":
        sortedList.sort(
          (a, b) => (new Date(b.prompt_date_post) as any) - (new Date(a.prompt_date_post) as any)
        );
        break;
      case "oldest":
        sortedList.sort(
          (a, b) => (new Date(a.prompt_date_post) as any) - (new Date(b.prompt_date_post) as any)
        );
        break;
      case "highest-rated":
        sortedList.sort((a, b) => b.prompt_rate - a.prompt_rate);
        break;
      case "lowest-rated":
        sortedList.sort((a, b) => a.prompt_rate - b.prompt_rate);
        break;
      default:
        break;
    }
    setFilteredPromptsList(sortedList);
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
  const currentItems = filteredPromptsList?.slice(indexOfFirstItem, indexOfLastItem);

  // Зміна сторінки
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (promptsList === null) {
    return <PromptListPreloader />;
  }

  return (
    <>
      <div className="page-settings">
        <div className="prompts-filters-sort-container">
          <div className="prompts-filters-container">
            <Filter
              inActive={false}
              filterName="Тип"
              categories={getUniqueCategories(promptsList.map((prompt) => prompt.prompt_type))}
              onSelectCategory={(selectedCategories) => {
                handleCategoryFilter(selectedCategories);
              }}
              selectedCategories={selectedCategories}
            />
            <Filter
              inActive={false}
              filterName="Спеціалізація"
              categories={getUniqueCategories(
                promptsList.map((prompt) => prompt.prompt_speciality)
              )}
              onSelectCategory={(selectedCategories) => {
                handleCategoryFilter(selectedCategories);
              }}
              selectedCategories={selectedCategories}
            />
            <Filter
              inActive={false}
              filterName="Нейромережа"
              categories={getUniqueCategories(promptsList.map((prompt) => prompt.prompt_ai_title))}
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
              {/* <div className="counter">
                    <p></p>
                  </div> */}
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
                  filterName="Тип"
                  categories={getUniqueCategories(promptsList.map((prompt) => prompt.prompt_type))}
                  onSelectCategory={(selectedCategories) => {
                    handleCategoryFilter(selectedCategories);
                  }}
                  selectedCategories={selectedCategories}
                />
                <Filter
                  inActive={false}
                  filterName="Спеціалізація"
                  categories={getUniqueCategories(
                    promptsList.map((prompt) => prompt.prompt_speciality)
                  )}
                  onSelectCategory={(selectedCategories) => {
                    handleCategoryFilter(selectedCategories);
                  }}
                  selectedCategories={selectedCategories}
                />
                <Filter
                  inActive={false}
                  filterName="Нейромережа"
                  categories={getUniqueCategories(
                    promptsList.map((prompt) => prompt.prompt_ai_title)
                  )}
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
      <div className="prompts-list-container">
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((prompt, index) => (
            <div key={index} className="prompt-item">
              <div className="top-box">
                <CartRate rate={prompt.prompt_rate} />
                {prompt.promt_result_type.find((type) => type.name === "video") ? (
                  // Если тип - видео, показываем триггер модального окна
                  <YoutubeModal
                    videoTitle={prompt.prompt_name}
                    videoUrl={prompt.prompt_result_video_url}
                    imageUrl={prompt.prompt_result_img_url}
                  />
                ) : (
                  // Если тип - изображение, показываем изображение
                  <img
                    className="prev-img"
                    src={prompt.prompt_result_img_url}
                    alt={prompt.prompt_name}
                  />
                )}
                <DownloadBtn downloadLink={prompt.prompt_result_img_url} />
              </div>
              <div className="content-box">
                <div className="prompt-title-box">
                  <a className="prompt-ai-title" target="_blank" href={prompt.prompt_ai_url}>
                    {prompt.prompt_ai_title.map((type: MultiSelectOption) => type.name)}
                  </a>
                  <p className="prompt-name">{prompt.prompt_name}</p>
                </div>
                <AccordionPromptsItems promptsContent={prompt.prompt_pattern} />
                <div className="property-box">
                  {[
                    ...prompt.prompt_type.map((type: MultiSelectOption) => type.name),
                    ...prompt.prompt_speciality.map((type: MultiSelectOption) => type.name),
                    ...prompt.prompt_ai_title.map((type: MultiSelectOption) => type.name)
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
        totalItems={filteredPromptsList?.length || 0}
        paginate={paginate}
      />

      <ToastContainer />
    </>
  );
};

export default PromptsList;
