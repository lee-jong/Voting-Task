import Router from 'next/router';

export const handleRouter = (name) => {
    let page = name;
    if (page == undefined) {
        page = '/';
    } else {
        page = `/${name}`;
    }

    Router.push(page);
};

export const handleRouterDetail = (name, index) => {
    Router.push(`/${name}?index=${index}`);
};
