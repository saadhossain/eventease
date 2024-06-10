export const getUser = async (queryKey: string, queryValue: string | any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?${queryKey}=${queryValue}`);
    const data = await res.json();
    return data;
}