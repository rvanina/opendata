const stubData = {
    getMunicipal: (categoryId) => {
        if (!categoryId) {
            return Promise.resolve([{
                parentId: null,
                id: 1,
                name: 'Муниципальный Государственная программа "Улучшение инвестиционного климата и укрепление международных и межрегиональных связей Томской области"',
                value: 61508.9
            }])
        } else {
            return Promise.resolve([
                {
                    parentId: 1,
                    id: 2,
                    name: 'Муниципальный Подпрограмма "Формирование благоприятного инвестиционного климата на территории Томской области"',
                    value: 27533.1,
                },
                {
                    parentId: 1,
                    id: 3,
                    name: 'Муниципальный Дачи',
                    value: 27533.1,
                },
                {
                    parentId: 1,
                    id: 4,
                    name: 'Муниципальный Подпрограмма "Формирование благоприятного инвестиционного климата на территории Томской области"',
                    value: 4433.1,
                },
                {
                    parentId: 1,
                    id: 5,
                    name: 'Муниципальный Машины',
                    value: 4433.1,
                }
            ])
        }
    },
    getRegional: (categoryId) => {
        if (!categoryId) {
            return Promise.resolve([{
                parentId: null,
                id: 1,
                name: 'Региональный Государственная программа "Улучшение инвестиционного климата и укрепление международных и межрегиональных связей Томской области"',
                value: 61508.9
            }])
        } else {
            return Promise.resolve([
                {
                    parentId: 1,
                    id: 2,
                    name: 'Региональный Подпрограмма "Формирование благоприятного инвестиционного климата на территории Томской области"',
                    value: 27533.1,
                },
                {
                    parentId: 1,
                    id: 3,
                    name: 'Региональный Дачи',
                    value: 27533.1,
                },
                {
                    parentId: 1,
                    id: 4,
                    name: 'Региональный Подпрограмма "Формирование благоприятного инвестиционного климата на территории Томской области"',
                    value: 4433.1,
                },
                {
                    parentId: 1,
                    id: 5,
                    name: 'Региональный Машины',
                    value: 4433.1,
                }
            ])
        }
    }
}

class Api {
    constructor(config) {
        const { data, db } = config

        this.data = db
    }

    getMunicipal(categoryId) {
        return this.data.getData(categoryId, 'regional')
    }

    getRegional(categoryId) {
        return this.data.getData(categoryId, 'municipal')
    }
}

module.exports = Api