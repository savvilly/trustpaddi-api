const pagination = async (mongoQuery: any, page: any, limit: any, count: any) => {
    const totalPages = Math.ceil(count / limit); // total number of pages
    const offset = (Number(page)  - 1) * limit; // number of records to skip
    const data = await mongoQuery.skip(offset).limit(limit); // retrieve records for current page
    return { totalNumberPages: totalPages, curentPage: Number(page), data}
}

export default pagination