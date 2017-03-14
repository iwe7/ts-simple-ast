﻿import {expect} from "chai";
import {EnumDeclaration} from "./../../../compiler";
import {getInfoFromText} from "./../testHelpers";

describe(nameof(EnumDeclaration), () => {
    describe(nameof<EnumDeclaration>(d => d.addMember), () => {
        it("should add a member without a value", () => {
            const {firstChild, sourceFile} = getInfoFromText<EnumDeclaration>("enum MyEnum {\n}\n");
            firstChild.addMember({
                name: "myName"
            });
            expect(sourceFile.getFullText()).to.equal("enum MyEnum {\n    myName\n}\n");
        });

        it("should add a member with a value", () => {
            const {firstChild, sourceFile} = getInfoFromText<EnumDeclaration>("enum MyEnum {\n}\n");
            firstChild.addMember({
                name: "myName",
                value: 5
            });
            expect(sourceFile.getFullText()).to.equal("enum MyEnum {\n    myName = 5\n}\n");
        });

        it("should add a member and add a comma to the last member when no comma exists", () => {
            const {firstChild, sourceFile} = getInfoFromText<EnumDeclaration>("enum MyEnum {\n    member1\n}\n");
            firstChild.addMember({
                name: "member2"
            });
            expect(sourceFile.getFullText()).to.equal("enum MyEnum {\n    member1,\n    member2\n}\n");
        });

        it("should add a member and not add a comma to the last member when a comma exists", () => {
            const {firstChild, sourceFile} = getInfoFromText<EnumDeclaration>("enum MyEnum {\n    member1,\n}\n");
            firstChild.addMember({
                name: "member2"
            });
            expect(sourceFile.getFullText()).to.equal("enum MyEnum {\n    member1,\n    member2\n}\n");
        });
    });
});