import styled from 'styled-components'

export const Item = styled.div`
    a {
        display: block;
        background-color: #fff;
        border 1px solid #fff;
        margin: 10px;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        color: #000;
        transition: all ease .4s;

        &:hover {
            border-color: #ccc;
            background-color: #eee;
        }

        .itemImg img {
            width: 100%;
            border-radius: 5px;
        }

        .itemName {
            font-weight: bold;
        }
    }
`