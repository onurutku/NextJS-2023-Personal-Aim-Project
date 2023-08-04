import { getCategories } from "@/services/category.service";

export async function getCategoriesWithSSR() {
  return await getCategories();
}
export default async function CategoryBar({ data }: any) {
  const categoriesFromSSR: string[] = await getCategoriesWithSSR();
  const categories = ["cars", "toys", "flowers", ...categoriesFromSSR];
  if (true) {
    return (
      <ul className="navbar-nav d-flex flex-row justify-content-center bg-dark cursor-pointer">
        {categories?.map((category: string, index: number) => {
          return (
            <li role="button" key={index} className="nav-item ms-2 text-white">
              <a className="nav-link active" aria-current="page">
                {category}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}
