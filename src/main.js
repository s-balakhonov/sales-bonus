/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
   // @TODO: Расчет выручки от операции
   const { discount, sale_price, quantity } = purchase;
   return quantity * sale_price * (1 - discount / 100);
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    // @TODO: Расчет бонуса от позиции в рейтинге
    const { profit } = seller;
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    // @TODO: Проверка входных данных
    if (!data || !Array.isArray(data.sellers) || data.sellers.length === 0) {
        throw new Error ('Некорректные входные данные');
    }
    // @TODO: Проверка наличия опций
    const { calculateRevenue, calculateBonus } = options;
    // if (calculateRevenue !== "function" || calculateBonus !== "function") {
    //     throw new Error ('Переданные параметры не являются функциями');
    // }
    // @TODO: Подготовка промежуточных данных для сбора статистики
    const sellerStats = data.sellers.map(seller => ({
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,
        profit: 0,
        sales_count: 0,
        products_sold: {}
        }));
    console.log('sellerStats', sellerStats);

    // @TODO: Индексация продавцов и товаров для быстрого доступа
    const sellerIndex = data.sellers.reduce((index, seller) => {
        index[seller.id] = seller;
        return index;
    }, {});
    console.log('sellerIndex', sellerIndex);

    const productIndex = data.products.reduce((index, product) => {
        index[product.sku] = product;
        return index;
    }, {});
    console.log('productIndex', productIndex);

    data.purchase_records.forEach(record => {
        const seller = sellerIndex[record.seller_id];
        seller.sales_count++;
        seller.revenue += record.total_amount;

        record.items.forEach(item => {
            const product = productIndex[item.sku];
            const cost = product.purchase_price * item.quantity;
            const revenue = calculateRevenue(record, product);
            const income = revenue - cost;
            seller.profit += income;
            if (!seller.products_sold[item.sku]) {
                seller.products_sold[item.sku] = 0;
            }
            seller.products_sold[item.sku] += item.quantity;
        });
    });
    console.log('sellerIndex', sellerIndex);

    // @TODO: Расчет выручки и прибыли для каждого продавца

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}
